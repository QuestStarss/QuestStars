create table questorder
(
    id              int auto_increment
        primary key,
    date            date  not null,
    numberOfPlayers int   not null,
    totalCost       float not null,
    user_id         int   not null,
    quest_id        int   not null,
    constraint questorder_User_id_fk
        foreign key (user_id) references User (id)
            on update cascade on delete cascade,
    constraint questorder_quest_id_fk
        foreign key (quest_id) references quest (id)
            on update cascade on delete cascade
);

INSERT INTO queststars.questorder (id, date, numberOfPlayers, totalCost, user_id, quest_id) VALUES (1, '2008-07-20', 5, 13000, 1, 7);
