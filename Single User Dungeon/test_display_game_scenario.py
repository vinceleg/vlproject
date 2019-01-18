from unittest import TestCase
from game import display_game_scenario


class TestDisplayGameScenario(TestCase):
    def test_display_game_scenario(self):
        self.assertIsNone(display_game_scenario())
