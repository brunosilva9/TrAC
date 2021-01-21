import { compact, toInteger, toNumber } from "lodash";
import { FieldResolver, Resolver, Root } from "type-graphql";

import { defaultStateCourse } from "../../../client/constants";
import { CourseDataLoader } from "../../dataloaders/course";
import {
  CourseStatsByCourseTakenDataLoader,
  CourseStatsByStateDataLoader,
<<<<<<< HEAD
  StudentCourseDataLoader,
} from "../../dataloaders/takenCourse";
=======
  StudentExternalEvaluationCourseDataLoader,
} from "../../dataloaders/takenCourse";
import { StudentExternalEvaluationAndCourseDataLoader } from "../../dataloaders/takenExternalEvaluation";
>>>>>>> new-proyect/main
import { TakenCourse } from "../../entities/data/takenCourse";
import { assertIsDefined } from "../../utils/assert";
import { clearErrorArray } from "../../utils/clearErrorArray";

import type { $PropertyType } from "utility-types";

export type PartialTakenCourse = Pick<TakenCourse, "id" | "code" | "equiv">;

@Resolver(() => TakenCourse)
export class TakenCourseResolver {
  @FieldResolver()
  async name(
    @Root()
    { code }: PartialTakenCourse
  ): Promise<$PropertyType<TakenCourse, "name">> {
    assertIsDefined(
      code,
      `code needs to be available for Taken Course field resolvers`
    );
    const nameData = await CourseDataLoader.load(code);

    if (nameData === undefined) {
      return code;
    }
<<<<<<< HEAD

    return nameData.name ?? nameData.id;
  }
=======
    return nameData.name ?? nameData.id;
  }

>>>>>>> new-proyect/main
  @FieldResolver()
  async registration(
    @Root()
    { id }: PartialTakenCourse
  ): Promise<$PropertyType<TakenCourse, "registration">> {
    assertIsDefined(
      id,
      `id needs to be available for Taken Course field resolvers`
    );
<<<<<<< HEAD
    const registrationData = await StudentCourseDataLoader.load(id);
=======
    const registrationData = await StudentExternalEvaluationAndCourseDataLoader.load(
      id
    );
>>>>>>> new-proyect/main
    assertIsDefined(
      registrationData,
      `Registration could not be found for ${id} taken course`
    );
    return registrationData.registration;
  }
  @FieldResolver()
  async grade(
    @Root()
    { id }: PartialTakenCourse
  ): Promise<$PropertyType<TakenCourse, "grade">> {
    assertIsDefined(
      id,
      `id and code needs to be available for Taken Course field resolvers`
    );
<<<<<<< HEAD
    const gradeData = await StudentCourseDataLoader.load(id);
=======
    const gradeData = await StudentExternalEvaluationAndCourseDataLoader.load(
      id
    );
>>>>>>> new-proyect/main
    assertIsDefined(
      gradeData,
      `Grade could not be found for ${id} taken course`
    );
    return gradeData.grade;
  }
  @FieldResolver()
  async state(
    @Root()
    { id }: PartialTakenCourse
  ): Promise<$PropertyType<TakenCourse, "state">> {
    assertIsDefined(
      id,
      `id needs to be available for Taken Course field resolvers`
    );
<<<<<<< HEAD
    const stateData = await StudentCourseDataLoader.load(id);
=======
    const stateData = await StudentExternalEvaluationAndCourseDataLoader.load(
      id
    );
>>>>>>> new-proyect/main
    assertIsDefined(
      stateData,
      `State could not be found for ${id} taken course`
    );
<<<<<<< HEAD
=======

>>>>>>> new-proyect/main
    return defaultStateCourse(stateData.state);
  }
  @FieldResolver()
  async parallelGroup(
    @Root()
    { id }: PartialTakenCourse
  ) {
    assertIsDefined(
      id,
      `id needs to be available for Taken Course field resolvers`
    );
<<<<<<< HEAD
    const parallelGroupData = await StudentCourseDataLoader.load(id);
=======
    const parallelGroupData = await StudentExternalEvaluationAndCourseDataLoader.load(
      id
    );
>>>>>>> new-proyect/main
    assertIsDefined(
      parallelGroupData,
      `Parallel group could not be found for ${id} taken course`
    );
    return parallelGroupData.p_group;
  }
  @FieldResolver()
  async currentDistribution(
    @Root()
    { id, code }: PartialTakenCourse
  ): Promise<$PropertyType<TakenCourse, "currentDistribution">> {
    assertIsDefined(
      id,
      `id needs to be available for Taken Course field resolvers`
    );
    assertIsDefined(
      code,
      `code needs to be available for Taken Course field resolvers`
    );

<<<<<<< HEAD
    const dataTakenCourse = await StudentCourseDataLoader.load(id);
=======
    const dataTakenCourse = await StudentExternalEvaluationCourseDataLoader.load(
      id
    );
>>>>>>> new-proyect/main

    assertIsDefined(
      dataTakenCourse,
      `Data of the taken course ${id} ${code} could not be found!`
    );

    const histogramData = await CourseStatsByStateDataLoader.load({
      course_taken: code,
      year: dataTakenCourse.year,
      term: dataTakenCourse.term,
      p_group: dataTakenCourse.p_group,
    });

    if (histogramData === undefined) {
      return [];
    }

    assertIsDefined(
      histogramData,
      `Stats Data of the taken course ${id} ${code} could not be found!`
    );

    const histogramValues = histogramData.histogram.split(",").map(toInteger);
    const histogramLabels = histogramData.histogram_labels.split(",");

    return histogramValues.map((value, key) => {
      return {
        label: histogramLabels[key] ?? `${key}`,
        value,
      };
    });
  }

  @FieldResolver()
  async bandColors(
    @Root() { code, equiv }: PartialTakenCourse
  ): Promise<$PropertyType<TakenCourse, "bandColors">> {
    const bandColorsData = compact(
      clearErrorArray(
        await CourseStatsByCourseTakenDataLoader.loadMany(
          compact([equiv, code])
        )
      )
    )[0];

    if (bandColorsData === undefined) {
      return [];
    }

    const bandColors = bandColorsData.color_bands.split(";").map((value) => {
      const [min, max, color] = value.split(",");
      return {
        min: toNumber(min),
        max: toNumber(max),
        color,
      };
    });

    return bandColors;
  }
}
