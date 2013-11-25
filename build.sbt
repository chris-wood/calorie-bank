name := "calorie-bank"

version := "1.0-SNAPSHOT"

resolvers += Resolver.url("sbt-plugin-releases", new URL("http://repo.scala-sbt.org/scalasbt/sbt-plugin-releases/"))(Resolver.ivyStylePatterns)

libraryDependencies ++= Seq(
  //"com.amazonaws" % "aws-java-sdk" % "1.3.11",
  "securesocial" %% "securesocial" % "2.1.2",
  jdbc,
  anorm,
  cache
)

play.Project.playScalaSettings
