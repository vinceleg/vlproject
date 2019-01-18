from unittest import TestCase
from map import display_player_info
from character import Character


class TestDisplayPlayerInfo(TestCase):
    def test_display_player_info_none(self):
        player = Character("Vincent")
        self.assertIsNone(display_player_info(player))
