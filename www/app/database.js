app.constant('DB_CONFIG', {
    name: 'DB',
    tables: [
        {
            name: 'artists',
            columns: [
                {name: 'id', type: 'integer'},
                {name: 'name', type: 'text'},
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
        }
    ]
});