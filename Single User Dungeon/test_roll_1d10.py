from unittest import TestCase
import battle


class TestRoll1d10(TestCase):
    def test_roll_1d10_range_of_roll(self):
        actual = battle.roll_1d10()
        self.assertGreaterEqual(actual, 1)
        self.assertLessEqual(actual, 10)
