package models

import play.api.db._
import play.api.Play.current

import anorm._
import anorm.SqlParser._

case class Treat(name: String, calories: Int, img_id: Int)

object Treat {

  /**
   * Parse a Treat from a ResultSet
   */
  val simple = {
  	get[String]("treat.name") ~
  	get[Int]("treat.calories") ~
    get[Int]("treat.img_id") map {
  		case name ~ calories ~ img_id => Treat(name, calories, img_id)
  	}

    // get[Pk[Int]]("employee.employee_id") ~
    //   get[String]("employee.email") ~
    //   get[String]("employee.password") map {
    //     case id ~ email ~ password => Employee(id, email, password)
    //   }
  }

  // /**
  //  * Parse a (Employee,EmployeeDetail) from a ResultSet
  //  */
  // val withEmployeeDetail = Employee.simple ~ (EmployeeDetail.simple ?) map {
  //   case employee ~ employeeDetail => (employee, employeeDetail)
  // }

  /**
   * Create a new treat!
   *
   * @param the treat to insert.
   */
  def insert(treat: Treat): Int = {
    DB.withConnection { implicit connection =>
      SQL(
        """
          insert into treat(name,calories,img_id) values (
            {name}, {calories}, {img_id}
          )
        """).on(
          'name -> treat.name,
          'calories -> treat.calories,
          'img_id -> treat.img_id).executeUpdate()
    }
  }

  /**
   * Find Employee Via Email Id
   *
   * @param email the employee email id.
   */
  def findByTreatName(name: String) = {
    DB.withConnection { implicit connection =>
      val treats = SQL(
        """
          select * from TREAT
          where name = {name}
        """).on(
          'name -> name).as(Treat.simple.*)
      treats // return this treat that was just created
    }
  }

  // /**
  //  * Find Max Employee Id
  //  */
  // def findMaxEmployeeId = {
  //   DB.withConnection { implicit connection =>
  //     val empId = SQL(
  //       """
  //         select MAX(EMPLOYEE_ID) from EMPLOYEE 
  //       """).as(scalar[Int].single)
  //     empId
  //   }
  // }

  // /**
  //  * Find Employee Via Email and password
  //  */
  // def authenticate(employee: Employee) = {
  //   DB.withConnection { implicit connection =>
  //     val employeeFound = SQL(
  //       """
  //         select * from EMPLOYEE 
  //         where EMAIL = {email} and PASSWORD= {password}
  //       """).on(
  //         'email -> employee.email,
  //         'password -> employee.password).as(Employee.simple.singleOpt)
  //     employeeFound
  //   }
  // }

  // /**
  //  * Delete All Employees.
  //  */
  // def delete = {
  //   DB.withConnection { implicit connection =>
  //     SQL("delete from EMPLOYEE").executeUpdate()
  //   }
  // }

  /**
   * Find Employee With Employee Detail
   */

  // def employeeDetail(employeeId: Int) = {
  //   DB.withConnection { implicit connection =>
  //     val employeeDetail = SQL(
  //       """
  //         select * from EMPLOYEE_DETAIL
  //         where EMPLOYEE_ID = {employeeId}
  //       """).on(
  //         'employeeId -> employeeId).as(EmployeeDetail.simple.singleOpt)
  //     employeeDetail
  //   }
  // }
}