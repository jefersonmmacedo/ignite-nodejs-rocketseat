import {Request, Response} from 'express'
import CreateCourseService from './CreateCourseService'


export function createCourse(req: Request, res: Response) {
  CreateCourseService.execute({
    name:"Ignite Node Js",
    duration: 10,
    educator: "Jeferson M Macedo"
  });

  CreateCourseService.execute({
    name:"Ignite React Js",
    educator: "Jeferson M Moraes"
  });

  return res.send()
};