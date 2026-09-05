from pydantic import BaseModel, Field
from typing import Literal


class Question(BaseModel):
    id: str
    category: str
    difficulty: str
    question_type: str
    question: str
    model_answer: str | None = None
    key_concepts: list[str] = []
    is_pro: bool = False
    source: str | None = None


class GradeRequest(BaseModel):
    question_id: str
    answer: str


class GradeResult(BaseModel):
    question_id: str
    score: int
    band: str
    concepts_hit: list[str]
    concepts_missed: list[str]
    feedback: str
    mistakes: str
    recommended_next_step: str


class CategoryMastery(BaseModel):
    category: str
    score: int
    questions_attempted: int


class MasteryResponse(BaseModel):
    overall: int
    categories: list[CategoryMastery]
    strongest: str
    weakest: str


class PracticeRecommendation(BaseModel):
    category: str
    reason: str
    priority: int
    question_ids: list[str]


class PracticeResponse(BaseModel):
    recommendations: list[PracticeRecommendation]
    weakest_areas: list[str]


class HealthResponse(BaseModel):
    status: str
    service: str
