import pandas as pd
from sklearn.ensemble import RandomForestClassifier


class WeatherRiskAnalyzer:
    def __init__(self):
        self.model = RandomForestClassifier(n_estimators=10, random_state=42)

    def fit(self, data: pd.DataFrame, target_column: str):
        features = data.drop(columns=[target_column])
        self.model.fit(features, data[target_column])

    def assess(self, payload: pd.DataFrame):
        return self.model.predict_proba(payload)[:, 1]
