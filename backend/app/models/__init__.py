# # app/models/__init__.py

# # Keeping this file empty or minimal is the best way to avoid circular imports.
# # Do not import the model classes here if they depend on each other.

# from .crop import Crop
# from .farm import Farm
# from .user import User
# # Only import models that have NO dependencies on other models.
# # If Recommendation depends on Farm or Crop, DO NOT import it here.

# __all__ = ["Crop", "Farm", "User"]