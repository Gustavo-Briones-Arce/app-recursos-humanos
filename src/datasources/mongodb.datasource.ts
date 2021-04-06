import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://recursos-humanos:SzaI3u2r7RPQpoGb@cluster0.90aod.mongodb.net/app-recursos-humanos?retryWrites=true&w=majority',
  host: 'cluster0.90aod.mongodb.net',
  port: 27017,
  user: 'recursos-humanos',
  password: 'SzaI3u2r7RPQpoGb',
  database: 'app-recursos-humanos',
  useNewUrlParser: true,
  protocol: 'mongodb+srv'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
