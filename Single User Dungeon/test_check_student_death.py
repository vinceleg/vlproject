from unittest import TestCase
from battle import check_student_death
from student import Student


class TestCheckStudentDeath(TestCase):
    def test_check_student_death_return_none(self):
        opponent = Student()
        self.assertIsNone(check_student_death(opponent))
