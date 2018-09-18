1. Make root folder
2. git init
3. 
4. 
5. 
6. 
7. 
8. 
9. 
10. 
11. 
12. 
13. 
14. make sure knexfile has correct db path or migration won't populate in correct place
15. from CLI: knex migrate:make table_name; (for each table you need)
16. populate migration files created in 15
17. from CLI: knex migrate:latest; (knex migrate:rollback; to drop tables)
18. create seed files in seeds folder
19. from CLI: knex seed:make 01_filename
20. fill seed files with JSON objects
21. from CLI: knex seed:run
22. make routes folder
23. add routes path variables to server.js