from unittest import TestCase
from die import Die


class TestDie(TestCase):

    def setUp(self):
        self.test_die = Die(4)

    def test_get_sides_4_sided_die(self):
        self.assertEqual(4, self.test_die.get_sides())

    def test_roll_die_4_sided_die(self):
        self.assertGreaterEqual(self.test_die.roll_die(), 1)
        self.assertLessEqual(self.test_die.roll_die(), 4)

    def test_get_value_4_sided_die(self):
        self.assertEqual(1, self.test_die.get_value())