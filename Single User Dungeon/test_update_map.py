from unittest import TestCase
from character import Character
from map import update_map, game_map


class TestUpdateMap(TestCase):
    def test_update_map(self):
        player = Character("Vincent")
        a_map = []
        game_map(a_map)
        self.assertIsNone(update_map(a_map, player))
