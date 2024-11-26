INSERT INTO artists (nome, bio, "imageUrl", "createdAt", "updatedAt") VALUES
('Fernandinho', 'É um cantor brasileiro de música cristã contemporânea, compositor e pastor evangélico.', 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fprfernandinho%2F&psig=AOvVaw2-jUyAFjefSg26uyqK-geJ&ust=1732714967093000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMjdqLKQ-okDFQAAAAAdAAAAABAE', NOW(), NOW()),



INSERT INTO albums (title, "releaseYear", "coverImageUrl", "createdAt", "updatedAt", artista_id) VALUES
('Teus sonhos', 2012, 'https://upload.wikimedia.org/wikipedia/pt/f/fd/Teus_Sonhos_-_Fernandinho_-_2012.jpg', NOW(), NOW(), 1),


INSERT INTO musicas (titulo, duracao, "fileUrl", "createdAt", "updatedAt", artista_id, album_id) VALUES
('1 - INFINITAMENTE MAIS', 123, 'https://example.com/vaimalandra.mp3', NOW(), NOW(), 1, 1),
('2 - A ALEGRIA DO SENHOR ', 123, 'https://example.com/machika.mp3', NOW(), NOW(), 1, 1),
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
