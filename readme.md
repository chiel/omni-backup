# Omni

Omni is a headless CMS built in [Node.js][node] and [React][react]. Its main aim
is to remain agnostic to what kind of frontend you wish to build upon it. All
data is exposed through APIs which you can build on.

Besides this it aims to be fully extensible by offering the possibility to hook
into many core features. The plugin system is designed in such a way that each
plugin can add its own functionality which other plugins can build on top of.

The repository you are looking at is a monorepo, managed with [lerna][lerna].
This means that you will rarely use this repository unless you wish to
contribute something, which is always welcome!


## Extensibility

Plugins are at the core of Omni. Even functionalities that are considered core
are written as plugins where possible. This is done because it makes it easier
to replace things, and to ensure the plugin API stays as flexible as possible.


## Usage

Omni is currently not ready to build custom CMS' with. Sit tight! Once ready
there will be boilerplate projects to help you get started, as well as plugins
to help you extend the core without much effort.


## Contributing

I'll be the first to admit that developing on Omni is not really the smoothest
experience just yet, but we'll work on getting this to be a bit more pleasant in
the near-ish future.

To work on Omni, you'll need to have [node][node] and [yarn][yarn] installed.
Additionally, the only database adapter that exists at the moment is for
[MySQL][mysql], however there is a [docker compose][docker-compose] file
included which will boot start MySQL and create the needed database if you do
not wish to install it locally.

Once you have that all set up, fork and clone this repository.

```bash
$ git clone git@github.com/:you/omni.git
$ cd omni
```

Bootstrap the project. This will install all shared dependencies + lerna and
then run `lerna bootstrap`, which links packages into each other and installs
their dependencies.

```bash
$ yarn bootstrap
```

Start watching. Depending on which plugins you will need to do this with some
environment variables. Since the default boilerplate runs with all plugins
enabled, you will need a lot of them.

Additionally, if you wish use the Google Auth plugin, you will need to [create
some Google OAuth credentials][google-oauth].

```bash
$ API_URL='http://localhost:12830' && \
  MEDIA_UPLOADS_DIR=uploads && \
  MYSQL_DB_HOST='localhost' && \
  MYSQL_DB_USER='root' && \
  MYSQL_DB_PASS='root' && \
  MYSQL_DB_NAME='omni' && \
  AUTH_GOOGLE_CLIENT_ID='your_client_id' && \
  AUTH_GOOGLE_CLIENT_SECRET='your_client_secret' && \
  yarn watch
```

Once you've done this, Omni's UI will be running at http://localhost:12831 and
its API at http://localhost:12830.

The goal for the future is to be able to simply clone the project and run
`docker-compose up` to get started.

[node]:
[react]:
[lerna]: https://github.com/lernajs/lerna
[yarn]:
[mysql]:
[google-oauth]:
