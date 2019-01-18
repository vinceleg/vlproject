"""Die class"""
import random


class Die:
    """A class representing a Die"""

    def __init__(self, sides):
        """Initialize attributes to describe a die."""
        self.sides = sides
        self.face_value = 1

    def get_sides(self) -> int:
        """Return the number of sides on a die."""
        return self.sides

    def roll_die(self) -> int:
        """Simulate rolling a die."""
        self.face_value = random.randint(1, self.sides)
        return self.face_value

    def get_value(self) -> int:
        """Get current value of the die."""
        return self.face_value
