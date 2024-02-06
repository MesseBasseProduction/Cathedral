# Cathedral Admin Panel

## Dependencies

### Frontend
- Angular 17

### Python
- Python 3.12+
- Django 5.0

## Make commands

### Docker Compose

#### Variables

- `DC_PROFILE`: Docker Compose profile to activate. Values: `dev` (default), `deploy`.
- `DC_ENV_FILE`: Env file to use. Defaults to `./conf/development/conf.env`.

#### Commands

- `dcbuild`: build frontend and backend containers.
- `dcupd`: start containers in detached mode.
- `dcstop`: stop running containers.
- `dcdown`: stop and remove containers.
- `dclf`: display and follow container logs.
- `dcpull`: pull images.
- `dcps`: display container status
- `dcclean`: stop and remove containers, their volumes and remove frontend and backend images. __Use with caution, will permanently delete data.__

#### Examples

Build containers:

`make dcbuild`

Run containers:

`make dcupd`

Run containers with a different Compose profile:

`make dcupd DC_PROFILE=deploy`

Run containers with a differnent .env file:

`make dcupd DC_ENV_FILE=/path/to/.env`