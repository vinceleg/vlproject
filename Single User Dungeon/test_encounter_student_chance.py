from unittest import TestCase
from battle import encounter_student_chance
from character import Character


class TestEncounterStudentChance(TestCase):
    def test_encounter_student_chance(self):
        player = Character('Vincent')
        self.assertIsNone(encounter_student_chance(player))
