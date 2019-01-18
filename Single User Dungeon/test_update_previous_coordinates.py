from unittest import TestCase
from character import Character
from map import update_previous_coordinates


class TestUpdatePreviousCoordinates(TestCase):
    def test_update_previous_coordinates(self):
        player = Character("Vincent")
        self.assertIsNone(update_previous_coordinates(player))
