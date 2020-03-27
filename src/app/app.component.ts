import { Component, OnInit, InjectionToken, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from './model/course';
import { CoursesService } from './services/courses.service';
import { HttpClient } from '@angular/common/http';

// custom injection provider & token
export function coursesServiceProvider(http: HttpClient): CoursesService {
  return new CoursesService(http);
}

export const COURSES_SERVICE = new InjectionToken<CoursesService>(
  'COURSES_SERVICE'
);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    {
      provide: COURSES_SERVICE,
      useFactory: coursesServiceProvider,
      deps: [HttpClient]
    }
  ]
})
export class AppComponent implements OnInit {
  courses$: Observable<Course[]>;

  constructor(@Inject(COURSES_SERVICE) private coursesSvc: CoursesService) {}

  ngOnInit() {
    this.courses$ = this.coursesSvc.loadCourses();
  }

  save(course: Course) {
    this.coursesSvc.saveCourse(course);
  }
}
