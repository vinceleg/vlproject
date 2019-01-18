from unittest import TestCase
from map import print_map, game_map
from character import Character


class TestPrintMap(TestCase):
    def test_print_map(self):
        a_map = []
        game_map(a_map)
        player = Character("Vincent")
        self.assertIsNone(print_map(a_map, player))
