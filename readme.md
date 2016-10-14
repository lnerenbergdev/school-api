# School API Projectgr

For this exercise, we'll be writing a simple website which simulates a school's website, complete with grades, homework, and classes.

Since we only have so much time (and we haven't taught everything yet), we'll make a few assumptions that will speed up this exercise:
* There is only one user, and you don't have to handle authentication
* There are no limits or restrictions on the classes the user can take
* None of the data needs to be persistent - don't save anything to file, nor a database.

Here are some facts about the school simulation:
* The school has classes
* A student can sign up for some or all of these classes
* A student should only be able to sign up for a class once
* A student in a class has a grade
* A student in a class has a homework status for that class: "done" or "not done"

## API Specification:

### /grades

```GET /grades```

Returns the current grades for the user in JSON format.

```
{
    algebra : "A",
    "p.e." : "C",
    english : "B"
}
```
### /schedule

```GET /schedule```

Return the current schedule for the user in JSON format.

```["algebra", "p.e.", "english"]```


```POST /schedule [class_name]```

A POST to /schedule with a post document variable called "class_name" should add that class to the user's schedule.

### /homework

```GET /homework/:class_name```

Returns whether the student has completed their homework for the class matching class_name

```POST /homework/```

Sets that the student has completed their homework for this course

```GET /homework/```

Gets the current homework completion status for all of the student's classes
