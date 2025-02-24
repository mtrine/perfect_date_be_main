import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Plan } from "src/modules/plans/schemas/plan.schemas";

@Schema({
  timestamps: true,
})
export class Activity {

  @Prop({ required: true, ref: Plan.name } )
  planId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  notes: string;

}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
