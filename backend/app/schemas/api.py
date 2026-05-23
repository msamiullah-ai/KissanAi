from pydantic import BaseModel, ConfigDict, Field


class ErrorResponse(BaseModel):
    detail: str = Field(..., examples=["Unable to fetch weather data"])

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "detail": "Unable to fetch weather data",
            }
        }
    )
