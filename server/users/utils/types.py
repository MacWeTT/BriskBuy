from pydantic import BaseModel


class CodeRequest(BaseModel):
    code: str
    scope: str
    authuser: str
    prompt: str
