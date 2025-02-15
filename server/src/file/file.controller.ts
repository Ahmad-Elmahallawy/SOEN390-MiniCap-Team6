import * as common from "@nestjs/common";
import * as swagger from "@nestjs/swagger";
import * as nestAccessControl from "nest-access-control";
import {FileService} from "./file.service";
import {FileControllerBase} from "./base/file.controller.base";
import {MinioServer} from "./minioServer";


@swagger.ApiTags("files")
@common.Controller("files")
export class FileController extends FileControllerBase {
    constructor(
        protected readonly service: FileService,
        @nestAccessControl.InjectRolesBuilder()
        protected readonly rolesBuilder: nestAccessControl.RolesBuilder,
        protected readonly minioServer: MinioServer
    ) {
        super(service, rolesBuilder, minioServer);
    }
}
