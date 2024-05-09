create table comment
(
    id       int auto_increment
        primary key,
    questId  int  not null,
    userid   int  not null,
    comment  text not null,
    userRate int  not null,
    constraint comment_ibfk_1
        foreign key (questId) references quest (id)
            on update cascade on delete cascade,
    constraint comment_ibfk_2
        foreign key (userid) references User (id)
            on update cascade on delete cascade
);

create index questid
    on comment (questId);

create index userid
    on comment (userid);

