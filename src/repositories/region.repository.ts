import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Region, RegionRelations, Comuna} from '../models';
import {ComunaRepository} from './comuna.repository';

export class RegionRepository extends DefaultCrudRepository<
  Region,
  typeof Region.prototype.id,
  RegionRelations
> {

  public readonly comunas: HasManyRepositoryFactory<Comuna, typeof Region.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ComunaRepository') protected comunaRepositoryGetter: Getter<ComunaRepository>,
  ) {
    super(Region, dataSource);
    this.comunas = this.createHasManyRepositoryFactoryFor('comunas', comunaRepositoryGetter,);
    this.registerInclusionResolver('comunas', this.comunas.inclusionResolver);
  }
}
