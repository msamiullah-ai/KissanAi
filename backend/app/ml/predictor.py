import pandas as pd
from sklearn.linear_model import LinearRegression


class YieldPredictor:
    def __init__(self):
        self.model = LinearRegression()

    def fit(self, data: pd.DataFrame, target_column: str):
        features = data.drop(columns=[target_column])
        self.model.fit(features, data[target_column])

    def predict(self, payload: pd.DataFrame):
        return self.model.predict(payload)
