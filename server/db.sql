INSERT INTO artists (nome, bio, "imageUrl", "createdAt", "updatedAt") VALUES
('Fernandinho', 'É um cantor brasileiro de música cristã contemporânea, compositor e pastor evangélico.', 'https://res.cloudinary.com/dykauix6q/image/upload/v1732736310/artistas/sldxaze6u11bfkx7xxsv.png', NOW(), NOW())

INSERT INTO artists (nome, bio, "imageUrl", "createdAt", "updatedAt") VALUES
('Thalles Roberto', 'É um cantor e compositor brasileiro, mais conhecido pelo seu trabalho na música cristã contemporânea.', 'https://res.cloudinary.com/dykauix6q/image/upload/v1732736326/artistas/cgwm6my8wy831c8uyhxz.jpg', NOW(), NOW())

INSERT INTO artists (nome, bio, "imageUrl", "createdAt", "updatedAt") VALUES
('MORADA', 'É  uma banda brasileira de Worship, formada na cidade de Fernandópolis, interior de São Paulo em 2009. Com mais de uma década de carreira e cinco álbuns lançados', 'https://res.cloudinary.com/dykauix6q/image/upload/v1732818226/artistas/enkmfpvizctbitqbkzvp.jpg', NOW(), NOW())

INSERT INTO albums (title, "releaseYear", "coverImageUrl", "createdAt", "updatedAt", artista_id) VALUES
('Teus sonhos', 2012, 'https://res.cloudinary.com/dykauix6q/image/upload/v1732818745/albuns/uwv0d5etgriy5uufrar9.png', NOW(), NOW(), 2),

INSERT INTO albums (title, "releaseYear", "coverImageUrl", "createdAt", "updatedAt", artista_id) VALUES
('Uma história escrita pelo dedo de Deus', 2011, 'https://res.cloudinary.com/dykauix6q/image/upload/v1732820222/albuns/rkvrwfp3skitctbxkbln.jpg', NOW(), NOW(), 3),

INSERT INTO albums (title, "releaseYear", "coverImageUrl", "createdAt", "updatedAt", artista_id) VALUES
('É Ele', 2020, 'https://res.cloudinary.com/dykauix6q/image/upload/v1732938396/albuns/pbujstimqdlezyowps1q.jpg', NOW(), NOW(), 4),


INSERT INTO musicas (titulo, duracao, "fileUrl", "createdAt", "updatedAt", artista_id, album_id) VALUES
('1 - INFINITAMENTE MAIS', 123, 'https://res.cloudinary.com/dykauix6q/video/upload/v1733157577/musicas/zrezvxdwwptksaqcwdv6.mp3', NOW(), NOW(), 1, 1),
('2 - A ALEGRIA DO SENHOR ', 123, 'https://res.cloudinary.com/dykauix6q/video/upload/v1733157724/musicas/f5vg0y8pkj28fhyjtg9p.mp3', NOW(), NOW(), 1, 1),
('3 - TUDO É POSSÍVEL', 312, 'https://example.com/indecente.mp3', NOW(), NOW(), 1, 1),
('4 – JESUS, FILHO DE DEUS ', 321, 'https://example.com/simounao.mp3', NOW(), NOW(), 1, 1),
('5 - UMA COISA PEÇO AO SENHOR', 123, 'https://example.com/nasuacara.mp3', NOW(), NOW(), 1, 1),
('6 - TEUS SONHOS', 321, 'https://example.com/megusta.mp3', NOW(), NOW(), 2, 3),
('7 - CAIA FOGO', 123, 'https://example.com/girlfromrio.mp3', NOW(), NOW(), 2, 3),
('8 - VENTO IMPETUOSO', 321, 'https://example.com/loco.mp3', NOW(), NOW(), 2, 3),
('9 - O HINO', 123, 'https://example.com/topreocupada.mp3', NOW(), NOW(), 2, 3),
('10 - AGINDO DEUS', 321, 'https://example.com/comoanaconda.mp3', NOW(), NOW(), 2, 3),
('11 - MIL CAIRÃO', 123, 'https://example.com/teesperando.mp3', NOW(), NOW(), 3, 5),
('12 - UM DIA EM TUA CASA', 321, 'https://example.com/quandobad.mp3', NOW(), NOW(), 3, 5),

INSERT INTO musicas (titulo, duracao, "fileUrl", "createdAt", "updatedAt", artista_id, album_id) VALUES
('Arde outra vez', 123, 'https://res.cloudinary.com/dykauix6q/video/upload/v1733173198/musicas/kcrzpthqtcof0jimeapu.mp3', NOW(), NOW(), 2, 2),

INSERT INTO musicas (titulo, duracao, "fileUrl", "createdAt", "updatedAt", artista_id, album_id) VALUES
('OH! Se Fendesses (Ao Vivo)', 123, 'https://res.cloudinary.com/dykauix6q/video/upload/v1733173435/musicas/hayxnenlbgppasokhq5v.mp3', NOW(), NOW(), 3, 3)