<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $project_id
 * @property int $prd_id
 * @property string $type
 * @property string $path
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 */
class Export extends Model
{
    use HasFactory;

    protected $fillable = [
        'project_id',
        'prd_id',
        'type',
        'path',
    ];

    protected function casts(): array
    {
        return [];
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(Project::class);
    }

    public function prd(): BelongsTo
    {
        return $this->belongsTo(Prd::class);
    }
}
