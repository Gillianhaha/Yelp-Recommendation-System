import numpy as np
import pandas as pd
import json
from sklearn.metrics.pairwise import cosine_similarity

class Recommendation:
    def __init__(self):
        self.ratings_matrix = pd.read_pickle('../Dataset/ratings_matrix_new.pkl')
        self.business = pd.read_pickle('../Dataset/business.pkl')
        self.unique_business = pd.read_pickle('../Dataset/unique_business.pkl')
        self.unique_user = pd.read_pickle('../Dataset/unique_user.pkl')

    def find_user_similarity(self, userA, userB, ratings_matrix):
        businesses_rated_by_userA = ~ratings_matrix.loc[userA, :].isna()
        businesses_rated_by_userB = ~ratings_matrix.loc[userB, :].isna()
        businesses_rated_by_both_users = businesses_rated_by_userA & businesses_rated_by_userB
        ratings_of_userA = ratings_matrix.loc[userA, businesses_rated_by_both_users].values.reshape(1, -1)
        ratings_of_userB = ratings_matrix.loc[userB, businesses_rated_by_both_users].values.reshape(1, -1)
        similarity = cosine_similarity(ratings_of_userA, ratings_of_userB)[0][0]

        return similarity

    def user_item_rating_prediction(self, target_user, target_business, ratings_matrix):
        similarities_to_target_user = []
        ratings_given_to_target_business = []

        list_of_users_rating_target_business = list(
            ratings_matrix[~ratings_matrix.iloc[:, target_business].isna()].index)

        for other_user in list_of_users_rating_target_business:
            try:
                similarity = self.find_user_similarity(target_user, other_user, ratings_matrix)
                similarities_to_target_user.append(similarity)
                ratings_given_to_target_business.append(ratings_matrix.loc[other_user, target_business])
            except:
                pass

        return np.dot(ratings_given_to_target_business, similarities_to_target_user) / np.sum(
            similarities_to_target_user)

    def find_business_similarity(self, businessA, businessB, ratings_matrix):
        users_who_rated_businessA = ~ratings_matrix.loc[:, businessA].isna()
        users_who_rated_businessB = ~ratings_matrix.loc[:, businessB].isna()

        users_who_rated_both_businesses = users_who_rated_businessA & users_who_rated_businessB

        ratings_of_businessA = ratings_matrix.loc[users_who_rated_both_businesses, businessA].values.reshape(1, -1)
        ratings_of_businessB = ratings_matrix.loc[users_who_rated_both_businesses, businessB].values.reshape(1, -1)

        similarity = cosine_similarity(ratings_of_businessA, ratings_of_businessB)[0][0]

        return similarity

    def item_item_rating_prediction(self, target_user, target_business, ratings_matrix):
        similarities_to_target_business = []
        ratings_given_by_target_user = []

        list_of_businesses_rated_by_target_user = list(
            ratings_matrix.loc[:, ~ratings_matrix.iloc[target_user, :].isna()].columns)

        for other_business in list_of_businesses_rated_by_target_user:
            try:
                similarity = self.find_business_similarity(target_business, other_business, ratings_matrix)
                similarities_to_target_business.append(similarity)
                ratings_given_by_target_user.append(ratings_matrix.loc[target_user, other_business])
            except:
                pass

        return np.dot(ratings_given_by_target_user, similarities_to_target_business) / np.sum(
            similarities_to_target_business)

    def restaurant_predictions(self, ex_user_id, user_lat=39.9861726, user_lon=-75.1322293, gps_distance=0.015):

        ex_user_num = self.unique_user[self.unique_user['user_id'] == ex_user_id]
        user_num = ex_user_num.iloc[0, 0]

        min_lat = user_lat - gps_distance
        max_lat = user_lat + gps_distance
        min_lon = user_lon - gps_distance
        max_lon = user_lon + gps_distance

        list_of_businesses_in_range = []

        for record in self.business.index:
            bus_lat = self.business.iloc[record, 5]
            bus_lon = self.business.iloc[record, 6]

            if (bus_lat > min_lat) and (bus_lat < max_lat) and (bus_lon > min_lon) and (bus_lon < max_lon):
                list_of_businesses_in_range.append(record)

        businesses_in_range = self.business.loc[list_of_businesses_in_range, :]

        businesses_in_range.insert(6, 'user_rating', np.nan)

        businesses_in_range = pd.merge(businesses_in_range, self.unique_business, on='business_id', how='inner')

        for record in businesses_in_range.index:
            business_num = businesses_in_range.iloc[record, 9]
            ratings_prediction = self.item_item_rating_prediction(user_num, business_num, self.ratings_matrix) * 0.9 + self.user_item_rating_prediction(
                user_num, business_num, self.ratings_matrix) * 0.1
            businesses_in_range.iloc[record, 6] = ratings_prediction

        businesses_in_range.sort_values('user_rating', ascending=False, inplace=True)

        res = json.loads(businesses_in_range.to_json())

        response = []

        biz_list = list(res['name'].keys())

        result_limit = 10
        for idx in range(result_limit):
            biz_idx = biz_list[idx]

            biz_info = {}

            biz_info["name"] = res["name"][biz_idx]

            biz_info["latitude"] = res["latitude"][biz_idx]

            biz_info["longitude"] = res["longitude"][biz_idx]

            biz_info["star"] = res["stars"][biz_idx]

            response.append(biz_info)

        return response

    def predict_restaurant_mock(self, external_cid):
        return [{
            "name": "Wm Mulherin's Sons",
            "latitude": 39.971709,
            "longitude": -75.135062,
            "star": 4.5
          }]
