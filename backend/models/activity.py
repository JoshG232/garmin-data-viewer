from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field


class GarminModel(BaseModel):
    model_config = ConfigDict(populate_by_name=True)


class ActivityType(GarminModel):
    type_id: int = Field(alias="typeId")
    type_key: str = Field(alias="typeKey")
    parent_type_id: Optional[int] = Field(default=None, alias="parentTypeId")


class ActivityEventType(GarminModel):
    type_id: int = Field(alias="typeId")
    type_key: str = Field(alias="typeKey")


class ActivityPrivacy(GarminModel):
    type_id: int = Field(alias="typeId")
    type_key: str = Field(alias="typeKey")


class SummarizedDiveInfo(GarminModel):
    summarized_dive_gases: list[dict[str, Any]] = Field(alias="summarizedDiveGases")


class ActivityResponse(GarminModel):
    activity_id: int = Field(alias="activityId")
    activity_name: str = Field(alias="activityName")
    start_time_local: str = Field(alias="startTimeLocal")
    start_time_gmt: Optional[str] = Field(default=None, alias="startTimeGMT")
    activity_type: ActivityType = Field(alias="activityType")
    event_type: Optional[ActivityEventType] = Field(default=None, alias="eventType")
    is_favorite: Optional[bool] = Field(default=None, alias="isFavorite")
    is_pr: Optional[bool] = Field(default=None, alias="isPR")
    is_auto_calc_calories: Optional[bool] = Field(default=None, alias="isAutoCalcCalories")
    is_parent: Optional[bool] = Field(default=None, alias="isParent")
    distance: Optional[float] = None
    duration: Optional[float] = None
    elapsed_duration: Optional[float] = Field(default=None, alias="elapsedDuration")
    moving_duration: Optional[float] = Field(default=None, alias="movingDuration")
    elevation_gain: Optional[float] = Field(default=None, alias="elevationGain")
    elevation_loss: Optional[float] = Field(default=None, alias="elevationLoss")
    average_speed: Optional[float] = Field(default=None, alias="averageSpeed")
    max_speed: Optional[float] = Field(default=None, alias="maxSpeed")
    start_latitude: Optional[float] = Field(default=None, alias="startLatitude")
    start_longitude: Optional[float] = Field(default=None, alias="startLongitude")
    has_images: Optional[bool] = Field(default=None, alias="hasImages")
    owner_id: Optional[int] = Field(default=None, alias="ownerId")
    owner_display_name: Optional[str] = Field(default=None, alias="ownerDisplayName")
    owner_full_name: Optional[str] = Field(default=None, alias="ownerFullName")
    owner_profile_image_url_small: Optional[str] = Field(default=None, alias="ownerProfileImageUrlSmall")
    owner_profile_image_url_medium: Optional[str] = Field(default=None, alias="ownerProfileImageUrlMedium")
    owner_profile_image_url_large: Optional[str] = Field(default=None, alias="ownerProfileImageUrlLarge")
    calories: Optional[float] = None
    bmr_calories: Optional[float] = Field(default=None, alias="bmrCalories")
    average_hr: Optional[float] = Field(default=None, alias="averageHR")
    max_hr: Optional[float] = Field(default=None, alias="maxHR")
    privacy: Optional[ActivityPrivacy] = None
    has_video: Optional[bool] = Field(default=None, alias="hasVideo")
    begin_timestamp: Optional[int] = Field(default=None, alias="beginTimestamp")
    sport_type_id: Optional[int] = Field(default=None, alias="sportTypeId")
    aerobic_training_effect: Optional[float] = Field(default=None, alias="aerobicTrainingEffect")
    anaerobic_training_effect: Optional[float] = Field(default=None, alias="anaerobicTrainingEffect")
    min_temperature: Optional[float] = Field(default=None, alias="minTemperature")
    max_temperature: Optional[float] = Field(default=None, alias="maxTemperature")
    min_elevation: Optional[float] = Field(default=None, alias="minElevation")
    max_elevation: Optional[float] = Field(default=None, alias="maxElevation")
    average_elevation: Optional[float] = Field(default=None, alias="avgElevation")
    is_elevation_corrected: Optional[bool] = Field(default=None, alias="isElevationCorrected")
    is_deco_dive: Optional[bool] = Field(default=None, alias="isDecoDive")
    summarized_dive_info: Optional[SummarizedDiveInfo] = Field(default=None, alias="summarizedDiveInfo")
    max_vertical_speed: Optional[float] = Field(default=None, alias="maxVerticalSpeed")
    manufacturer: Optional[str] = None
    location_name: Optional[str] = Field(default=None, alias="locationName")
    lap_count: Optional[int] = Field(default=None, alias="lapCount")
    end_latitude: Optional[float] = Field(default=None, alias="endLatitude")
    end_longitude: Optional[float] = Field(default=None, alias="endLongitude")
    water_estimated: Optional[float] = Field(default=None, alias="waterEstimated")
    min_respiration_rate: Optional[float] = Field(default=None, alias="minRespirationRate")
    max_respiration_rate: Optional[float] = Field(default=None, alias="maxRespirationRate")
    average_respiration_rate: Optional[float] = Field(default=None, alias="avgRespirationRate")
    training_effect_label: Optional[str] = Field(default=None, alias="trainingEffectLabel")
    activity_training_load: Optional[float] = Field(default=None, alias="activityTrainingLoad")
    min_activity_lap_duration: Optional[float] = Field(default=None, alias="minActivityLapDuration")
    aerobic_training_effect_message: Optional[str] = Field(default=None, alias="aerobicTrainingEffectMessage")
    anaerobic_training_effect_message: Optional[str] = Field(default=None, alias="anaerobicTrainingEffectMessage")
    split_summaries: Optional[list[dict[str, Any]]] = Field(default=None, alias="splitSummaries")
    is_manual_activity: Optional[bool] = Field(default=None, alias="isManualActivity")
    moderate_intensity_minutes: Optional[int] = Field(default=None, alias="moderateIntensityMinutes")
    vigorous_intensity_minutes: Optional[int] = Field(default=None, alias="vigorousIntensityMinutes")
    hr_time_in_zone_1: Optional[float] = Field(default=None, alias="hrTimeInZone_1")
    hr_time_in_zone_2: Optional[float] = Field(default=None, alias="hrTimeInZone_2")
    hr_time_in_zone_3: Optional[float] = Field(default=None, alias="hrTimeInZone_3")
    hr_time_in_zone_4: Optional[float] = Field(default=None, alias="hrTimeInZone_4")
    hr_time_in_zone_5: Optional[float] = Field(default=None, alias="hrTimeInZone_5")
    end_time_gmt: Optional[str] = Field(default=None, alias="endTimeGMT")
    qualifying_dive: Optional[bool] = Field(default=None, alias="qualifyingDive")
    activity_uuid: Optional[str] = Field(default=None, alias="activityUUID")
    auto_calc_calories: Optional[bool] = Field(default=None, alias="autoCalcCalories")
    deco_dive: Optional[bool] = Field(default=None, alias="decoDive")
    elevation_corrected: Optional[bool] = Field(default=None, alias="elevationCorrected")
    manual_activity: Optional[bool] = Field(default=None, alias="manualActivity")
    favorite: Optional[bool] = None
    parent: Optional[bool] = None
    pr: Optional[bool] = None


