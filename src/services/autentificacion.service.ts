import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ServiceKeys as keys} from '../keys/service-keys';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {EncrypDecrypService} from './encryp-decryp.service';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutentificacionService {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
  ) { }

  async Identificar(email: string, contrasena: string): Promise<Usuario | false> {
    let usuario = await this.usuarioRepository.findOne({where: {email: email}});
    if (usuario) {
      let encryp = new EncrypDecrypService(keys.MD5).Encryp(contrasena);
      if (usuario.contrasena == encryp) {
        return usuario
      }
    }
    return false;
  }

  async GenerarToken(usuario: Usuario) {
    usuario.contrasena = '';
    let tk = jwt.sign({
      exp: keys.TOKEN_EXPIRATION_TIME,
      data: {
        _id: usuario.id,
        email: usuario.email,
        rut: usuario.rut
      }
    },
      keys.JWT_SECRET_KEY);
    return tk;
  }
}
