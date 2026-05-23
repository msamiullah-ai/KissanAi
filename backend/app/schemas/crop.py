from pydantic import BaseModel, ConfigDict, Field


class DeprecatedEndpointResponse(BaseModel):
    status: str = Field(..., examples=["deprecated"])
    message: str = Field(..., examples=["The crop recommendation endpoint has been retired."])
    replacement_endpoint: str = Field(..., examples=["POST /api/recommendations/generate"])

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "status": "deprecated",
                "message": "The crop recommendation endpoint has been retired.",
                "replacement_endpoint": "POST /api/recommendations/generate",
            }
        }
    )
