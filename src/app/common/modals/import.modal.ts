import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { WorldFile } from 'src/app/gameboard/utils';
import { commonEnvironment } from 'src/environments/environment.common';

@Component({
  selector: 'import-modal',
  templateUrl: './import.modal.html',
  styleUrls: ['./modal.styles.scss'],
  styles: [
    `
      ::ng-deep .modal-content {
        max-width: 500px !important;
        width: auto;
        min-width: none;
      }

      span {
        color: red;
      }
    `,
  ],
})
export class ImportModal {
  formGroup: FormGroup;
  versionError: boolean;
  olderNewer: string;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder
  ) {}

  init(worldFile: WorldFile) {
    this.formGroup = this.formBuilder.group({
      name: [worldFile.world_data.name],
      author: [worldFile.world_data.author],
      description: [worldFile.world_data.description],
      version: [worldFile.version],
    });
    this.versionError = worldFile.version != commonEnvironment.worldFileVersion;
    this.olderNewer =
      worldFile.version > commonEnvironment.worldFileVersion
        ? 'MODALS.IMPORT_WORLD.OLDER'
        : 'MODALS.IMPORT_WORLD.NEWER';
  }
}
