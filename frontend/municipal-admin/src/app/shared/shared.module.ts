import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";

@NgModule({
  imports: [MatIconModule, MatProgressSpinnerModule, MatToolbarModule],
  exports: [MatIconModule, MatProgressSpinnerModule, MatToolbarModule]
})
export class SharedModule {}