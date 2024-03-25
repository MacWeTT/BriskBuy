from pydantic import BaseModel

# from typing import Optional


class PatchCartRequest(BaseModel):
    method: str
    product_id: str
