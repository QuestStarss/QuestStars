create table questImages
(
    id        int auto_increment
        primary key,
    questId   int          not null,
    imageName varchar(400) not null,
    constraint questimages_ibfk_1
        foreign key (questId) references quest (id)
            on update cascade on delete cascade
);

create index questId
    on questImages (questId);

INSERT INTO queststars.questImages (id, questId, imageName) VALUES (5, 7, 'мотя.jpg');
INSERT INTO queststars.questImages (id, questId, imageName) VALUES (6, 8, 'zw91vJBipnM.jpg');
