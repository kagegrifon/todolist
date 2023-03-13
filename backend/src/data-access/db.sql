create TABLE todo(
    id SERIAL PRIMARY KEY
    , name VARCHAR(255) NOT NULL
    , isDone BOOLEAN NOT NULL
)