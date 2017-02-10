app.constant('DB_CONFIG', {
    name: 'granadasound',
    tables: [
        {
            name: 'artists',
            erasable: true,
            columns: [
                {name: 'id', type: 'integer'},
                {name: 'name', type: 'text UNIQUE'},
                {name: 'description', type: 'text'},
                {name: 'image_profile', type: 'text'},
                {name: 'image_cover', type: 'text'},
                {name: 'stage_id', type: 'text'},
                {name: 'stage_name', type: 'text'},
                {name: 'schedule', type: 'text'},
                {name: 'spotify_id', type: 'text'},
                {name: 'facebook', type: 'text'},
                {name: 'twitter', type: 'text'},
                {name: 'instagram', type: 'text'}
            ]
        },
        {
            name: 'favorites',
            erasable: false,
            columns: [
                {name: 'artist_id', type: 'integer'},
                {name: 'user_id', type: 'integer'}
            ]
        },
        {
            name: 'posters',
            erasable: true,
            columns: [
                {name: 'id', type: 'integer PRIMARY KEY UNIQUE'},
                {name: 'image', type: 'text UNIQUE'}
            ]
        },
        {
            name: 'maps',
            erasable: true,
            columns: [
                {name: 'id', type: 'integer PRIMARY KEY AUTOINCREMENT'},
                {name: 'name', type: 'text'},
                {name: 'image', type: 'text'},
                {name: 'latitude', type: 'text'},
                {name: 'longitude', type: 'text'}
            ]
        },
        {
            name: 'locations',
            erasable: true,
            columns: [
                {name: 'id', type: 'integer PRIMARY KEY AUTOINCREMENT'},
                {name: 'name', type: 'text'},
                {name: 'detail', type: 'text'},
                {name: 'image', type: 'text'},
                {name: 'latitude', type: 'text'},
                {name: 'longitude', type: 'text'}
            ]
        }
    ]
});
