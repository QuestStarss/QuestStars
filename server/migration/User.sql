create table User
(
    id       int auto_increment
        primary key,
    Name     varchar(220) not null,
    Login    varchar(100) not null,
    Password varchar(300) not null,
    Email    varchar(40)  not null,
    constraint User_pk
        unique (Login),
    constraint User_pk_2
        unique (Email)
);

INSERT INTO queststars.User (id, Name, Login, Password, Email) VALUES (1, 'Гладков Матвей', 'matthewgldkv', '12345678', 'matthew@gladkov');
INSERT INTO queststars.User (id, Name, Login, Password, Email) VALUES (2, 'Владимир Коновалов', 'vovuslex', '12345657', 'vova@mail');
INSERT INTO queststars.User (id, Name, Login, Password, Email) VALUES (3, 'Адольф Гитлер', 'user', '$2y$10$ddEplX4t3c1na4EaUVKWpOZXjqEMxOy0Bbg1oNsHYufyW2eaxynrW', 'gmail@.com');
INSERT INTO queststars.User (id, Name, Login, Password, Email) VALUES (6, '1111111', '1111111', '$2y$10$w7Y.KPN9gES8H/xaTi.0t.ydjTDoyE6YgvupYkmtueBid6h4YTlb2', '1111@mail.ru');
INSERT INTO queststars.User (id, Name, Login, Password, Email) VALUES (7, 'test', 'test', '$2y$10$Dm7CSZoFe5atH.SZISId2uY0TqFHmgS0t/MebJchYCchW6I7wPiv2', 'test@mail.ru');
INSERT INTO queststars.User (id, Name, Login, Password, Email) VALUES (8, 'hui', 'govno', '$2y$10$fdI1Xb.pJJcUGEeE0Lj.Q.tCVZb84jqvIlTTQVdx5K5znxE7fTjja', 'bliadiana@zalupa.her');
INSERT INTO queststars.User (id, Name, Login, Password, Email) VALUES (9, '1111', 'Vovuchooo', '$2y$10$vR3UeF6fAqUmdkVsEPgH3O50QqrCITg.hH89EyaK5/5T9DxGLq58O', '111@mail.ru');
INSERT INTO queststars.User (id, Name, Login, Password, Email) VALUES (14, 'matthew', 'matthewgldkv1', '$2y$10$jyagUWynzD1ZS.rabz30e.0FsnMTKu8fVPnqbbuxNiNDDdT05ekMW', 'matthew@gladkov1.com');
