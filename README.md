# pressb
net user postgres ,bkfqy1 /add
choco install postgresql --params '/Password:,bkfqy1' --params-global
initdb.exe -D "c:\pg_press" --locale=Russian_Russia --encoding=UTF8 -U postgres -W
pg_ctl register -D "c:\pg_press" -N PostgreSQL -U postgres -P ",bkfqy1" -S a
net start PostgreSQL
createdb -U postgres press


--pg_ctl init -D c:\pgsql -o --locale=ru_RU

initdb.exe -D "c:\pg_press" --locale=Russian_Russia --encoding=UTF8 -U ".\postgres" -W
--locale=ru_RU

--sc create pgsql_cluster displayname= "PostrgeSQL_Cluster" obj= ".\postgres" password= ",bkfqy1" start= auto binPath= "pg_ctl.exe runservice -w -N pgsql_cluster -D c:\pg_press"

pg_ctl register -D "c:\pg_press" -N PostgreSQL -U ".\postgres" -P ",bkfqy1" -S a

pg_ctl unregister -N PostgreSQL

net start PostgreSQL

psql -d template1 -U ".\postgres"
# CREATE USER postgres WITH SUPERUSER ENCRYPTED PASSWORD ',bkfqy1';

psql -U postgres
# CREATE DATABASE press;

