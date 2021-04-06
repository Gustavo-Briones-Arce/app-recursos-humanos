import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Comuna, ComunaRelations, Region} from '../models';
import {RegionRepository} from './region.repository';

export class ComunaRepository extends DefaultCrudRepository<
  Comuna,
  typeof Comuna.prototype.id,
  ComunaRelations
> {

  public readonly region: BelongsToAccessor<Region, typeof Comuna.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RegionRepository') protected regionRepositoryGetter: Getter<RegionRepository>,
  ) {
    super(Comuna, dataSource);
    this.region = this.createBelongsToAccessorFor('region', regionRepositoryGetter,);
    this.registerInclusionResolver('region', this.region.inclusionResolver);
  }
}
