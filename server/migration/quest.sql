create table quest
(
    id          int auto_increment
        primary key,
    title       varchar(200) not null,
    description text         not null,
    maxPlayers  int          not null,
    rating      float        not null,
    numOfGrades int          not null,
    genre       varchar(240) null
);

INSERT INTO queststars.quest (id, title, description, maxPlayers, rating, numOfGrades, genre) VALUES (7, 'просто ебейший квест', 'просто ахуенный квест', 5, 14, 3, null);
INSERT INTO queststars.quest (id, title, description, maxPlayers, rating, numOfGrades, genre) VALUES (8, 'Ужасные ужасы', 'Страхоебные ужасы сука блять', 5, 20, 7, 'Ужасы');
