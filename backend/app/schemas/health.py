from pydantic import BaseModel, ConfigDict, Field


class HealthResponse(BaseModel):
    status: str = Field(..., examples=["ok"])
    message: str = Field(..., examples=["KissanAI backend is healthy"])

    model_config = ConfigDict(
        json_schema_extra={
            "example": {
                "status": "ok",
                "message": "KissanAI backend is healthy",
            }
        }
    )
