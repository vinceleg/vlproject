from unittest import TestCase
from battle import regain_hp
from character import Character


class TestRegainHp(TestCase):
    def test_regain_hp(self):
        player = Character('Vincent')
        self.assertIsNone(regain_hp(player))
