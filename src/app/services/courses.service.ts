import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Course } from '../model/course';
import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
export class CoursesService implements OnDestroy {
  private coursesSubject: BehaviorSubject<Course[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  loadCourses(): Observable<Course[]> {
    this.http.get<Course[]>('/api/courses').subscribe(courses => {
      this.coursesSubject.next(courses);
    });

    return this.coursesSubject.asObservable();
  }

  saveCourse(course: Course) {
    this.http.put(`/api/courses/${course.id}`, course).subscribe(res => {
      console.log('[save result]', res);
    });
  }

  ngOnDestroy(): void {}
}
